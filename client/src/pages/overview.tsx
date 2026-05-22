import { Card } from "@/components/ui/card";

export const Overview = () => {
  return (
    <>
      <div className="pt-8 pb-4 border-b-2 w-full max-w-3xl">
        <h1 className="pt-20 text-white text-2xl font-bold">Hello, "user." </h1>
      </div>

      <div className="flex w-full max-w-3xl mx-auto">
        <div className="">
          <div className="">
            <Card className="py-4 px-8">
              <h1 className="text-2xl">Shift Details:</h1>
              <div className="mt-4">
                <div className="text-lg">
                  <h1>Elapsed Time: "Shift Time"</h1>
                  <h1 className="">Shift Manager "logged in user"</h1>
                  <h1>Tasks completed: "amount of tasks"</h1>
                </div>
                <h1 className="mt-6">Waste Total $:</h1>
                <h1 className="mt-6">Tasks to be Completed #:</h1>
              </div>
            </Card>
          </div>
          <div className="">
            <Card className="py-4 px-8">
              <h1 className="text-2xl">Shift Details:</h1>
              <div className="mt-4">
                <div className="text-lg">
                  <h1>Elapsed Time: "Shift Time"</h1>
                  <h1 className="">Shift Manager "logged in user"</h1>
                  <h1>Tasks completed: "amount of tasks"</h1>
                </div>
                <h1 className="mt-6">Waste Total $:</h1>
                <h1 className="mt-6">Tasks to be Completed #:</h1>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-12">
            <div className="">
            <Card className="py-4 px-8">
              <h1 className="text-2xl">Shift Details:</h1>
              <div className="mt-4">
                <div className="text-lg">
                  <h1>Elapsed Time: "Shift Time"</h1>
                  <h1 className="">Shift Manager "logged in user"</h1>
                  <h1>Tasks completed: "amount of tasks"</h1>
                </div>
                <h1 className="mt-6">Waste Total $:</h1>
                <h1 className="mt-6">Tasks to be Completed #:</h1>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
