import { ShiftWasteCards } from "@/components/Overview/shift-waste-cards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Overview = () => {
  return (
    <div className="py-6 px-10">
      <div className=" border-b-2 w-full max-w-3xl p-2">
        <h1 className=" text-white text-2xl font-bold">Hello, "user." </h1>
      </div>

      <div className="flex w-full max-w-3xl mt-12 justify-between">
       <ShiftWasteCards />
        <div>
            <div className="">
            <Card className="py-4 px-8">
              <CardHeader>Tasks to be completed:</CardHeader>
              <CardContent>
                Empty list of tasks:
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
