import { Spinner } from "@heroui/react";


export default function SpinnerUI(){
    return (
      <div className="flex flex-column align-items-center justify-center h-screen space-y-2">
        <Spinner color="warning" label="Loading..." />;
      </div>
    );
}