import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export const ShiftWasteCards = () => {
  return (
    <div className="flex flex-col gap-24">

      <Card  className="bg-accent-foreground text-white border-border-color drop-shadow-xl drop-shadow-destructive">
        <CardHeader>Shift Details:</CardHeader>
        <CardContent>
          <div>
            <div>
              <h1>Elapsed Time: "Shift Time"</h1>
              <h1>Shift Manager "logged in user"</h1>
              <h1>Tasks completed: "amount of tasks"</h1>
            </div>
            <h1>Waste Total $:</h1>
            <h1>Tasks to be Completed #:</h1>
          </div>
        </CardContent>
        <CardFooter>
            Last updated: "updatedLast"
        </CardFooter>
      </Card>

      
    </div>
  );
};
