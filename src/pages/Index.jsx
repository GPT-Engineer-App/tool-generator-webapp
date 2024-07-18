import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [generatedCode, setGeneratedCode] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/generate_tool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setGeneratedCode(result.code);
    } catch (error) {
      console.error("Error generating tool:", error);
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
      <Card>
        <CardHeader>
          <CardTitle>Tool Generator</CardTitle>
          <CardDescription>Fill in the details to generate your custom tool</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label htmlFor="toolName" className="block text-sm font-medium text-gray-700">Tool Name</label>
                    <Input id="toolName" {...register("toolName")} placeholder="Enter tool name" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter a unique name for your tool</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <Textarea id="description" {...register("description")} placeholder="Describe your tool" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Provide a brief description of your tool's functionality</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Primary Programming Language</label>
                    <Select onValueChange={(value) => setValue("language", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose the main programming language for your tool</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label htmlFor="frameworks" className="block text-sm font-medium text-gray-700">Frameworks</label>
                    <Input id="frameworks" {...register("frameworks")} placeholder="Enter frameworks (comma-separated)" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List any frameworks or libraries your tool will use</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label htmlFor="inputType" className="block text-sm font-medium text-gray-700">Input Type</label>
                    <Input id="inputType" {...register("inputType")} placeholder="Specify input type" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Describe the type of input your tool will accept</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label htmlFor="outputType" className="block text-sm font-medium text-gray-700">Output Type</label>
                    <Input id="outputType" {...register("outputType")} placeholder="Specify output type" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Describe the type of output your tool will produce</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label htmlFor="additionalFeatures" className="block text-sm font-medium text-gray-700">Additional Features</label>
                    <Textarea id="additionalFeatures" {...register("additionalFeatures")} placeholder="List any additional features" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Specify any extra features or requirements for your tool</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button type="submit">Generate Tool</Button>
          </form>
        </CardContent>
      </Card>

      {generatedCode && (
        <Card className="mt-8">
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