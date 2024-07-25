import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const formSchema = z.object({
  toolName: z.string().min(1, "Tool name is required"),
  description: z.string().min(1, "Description is required"),
  language: z.string().min(1, "Language is required"),
  frameworks: z.array(z.string()).min(1, "At least one framework is required"),
  inputType: z.string().min(1, "Input type is required"),
  outputType: z.string().min(1, "Output type is required"),
  additionalFeatures: z.array(z.string()),
  includeComments: z.boolean().default(false),
  codeStyle: z.enum(["standard", "compact", "verbose"]).default("standard"),
});

const Index = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toolName: "",
      description: "",
      language: "",
      frameworks: [],
      inputType: "",
      outputType: "",
      additionalFeatures: [],
      includeComments: false,
      codeStyle: "standard",
    },
  });

  const languageOptions = ["Python", "JavaScript", "Java", "C#", "Ruby", "Go"];
  const frameworkOptions = ["Django", "Flask", "React", "Angular", "Spring", ".NET", "Ruby on Rails", "Express.js"];
  const dataTypeOptions = ["Text", "JSON", "XML", "CSV", "Binary"];
  const additionalFeatureOptions = ["Logging", "Authentication", "Caching", "Rate Limiting", "Monitoring", "API Documentation", "Database Integration", "Error Handling"];

  useEffect(() => {
    // Set default example when the page loads
    setGeneratedCode(`
# Example Tool
# This is an example of generated code

class ExampleTool:
    def __init__(self):
        self.frameworks = ["example_framework"]

    def process_input(self, input_data: str) -> str:
        # TODO: Implement input processing logic
        return input_data.upper()

    def generate_output(self) -> str:
        # TODO: Implement output generation logic
        return "Example output"

if __name__ == "__main__":
    tool = ExampleTool()
    result = tool.process_input("Hello, World!")
    print(result)
    `);
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate_tool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to generate code");
      }
      const result = await response.json();
      setGeneratedCode(result.code);
      toast.success("Code generated successfully!");
    } catch (error) {
      console.error("Error generating tool:", error);
      toast.error("Failed to generate code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_tool.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tool Generator</CardTitle>
          <CardDescription>Fill in the details to generate your custom tool</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="toolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tool Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter tool name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe your tool" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Programming Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languageOptions.map((lang) => (
                          <SelectItem key={lang} value={lang.toLowerCase()}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frameworks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frameworks</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange([...field.value, value])}
                        value={field.value}
                        multiple
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frameworks" />
                        </SelectTrigger>
                        <SelectContent>
                          {frameworkOptions.map((framework) => (
                            <SelectItem key={framework} value={framework.toLowerCase()}>
                              {framework}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Selected frameworks: {field.value.join(", ")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inputType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select input type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dataTypeOptions.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outputType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select output type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dataTypeOptions.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Features</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange([...field.value, value])}
                        value={field.value}
                        multiple
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select additional features" />
                        </SelectTrigger>
                        <SelectContent>
                          {additionalFeatureOptions.map((feature) => (
                            <SelectItem key={feature} value={feature.toLowerCase()}>
                              {feature}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Selected features: {field.value.join(", ")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="includeComments"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Include Comments
                      </FormLabel>
                      <FormDescription>
                        Add explanatory comments to the generated code
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codeStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a code style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="verbose">Verbose</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Tool"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code>{generatedCode}</code>
            </pre>
          </CardContent>
          <CardFooter>
            <Button onClick={downloadCode}>Download Code</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Index;