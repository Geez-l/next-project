// export default function ReactIntermediate() {
//     return (

//     );
// }
import { Spinner } from "@heroui/react";

export default function SpinnerUI() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Spinner size="lg" />  {/* <-- valid type */}
      <div className="mt-2">Loading...</div>
    </div>
  );
}