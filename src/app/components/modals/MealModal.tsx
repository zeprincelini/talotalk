import Image from "next/image";
import { ReactElement } from "react";

import Modal from "../shared/Modal";

type Props = {
  id: string;
  open: boolean;
  close: () => void;
  clickOutside?: true;
};

const MealModal = ({
  open,
  close,
  clickOutside = true,
}: Props): ReactElement => {
  const src = "";
  const name = "Egusi flavor";
  return (
    <Modal {...{ open }} {...{ close }} {...{ clickOutside }}>
      <div className="grid grid-cols-12">
        <div className="col-span-7 grid gap-8">
          <div className="relative w-full h-[400px]">
            <Image {...{ src }} alt={"Meal cover"} fill={true} />
          </div>
          <div className="flex justify-between">
            <p>{name}</p>
            <p>$2000</p>
          </div>
        </div>
        <div className="col-span-5">Add to cart</div>
      </div>
    </Modal>
  );
};

export default MealModal;
