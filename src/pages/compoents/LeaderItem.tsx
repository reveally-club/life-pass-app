import { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { fireStore } from "../../../modules/firebase";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface Props {
  updatedAt: string;
  name: string;
}

const LeaderItem: NextPage<Props> = ({ name, updatedAt }) => {
  const [isSuccess, setSuccess] = useState(false);

  const getTargetedAt = async (name: string) => {
    const seasonRef = collection(fireStore, "season0");
    const seasonQuery = query(seasonRef, where("name", "==", name));
    const querySnapshot = await getDocs(seasonQuery);
    if (querySnapshot.size >= 1) {
      const doc = querySnapshot.docs[0];
      return doc?.data().targetedAt.toDate();
    }
  };

  const isWithin30MinsAndPast15Mins = async (): Promise<boolean> => {
    const targetedAt = await getTargetedAt(name);
    if (targetedAt !== undefined) {
      const submmitedAt = dayjs(updatedAt).date(14);

      return submmitedAt.isBetween(
        dayjs(targetedAt).subtract(30, "minute"),
        dayjs(targetedAt).add(15, "minute")
      );
    }
    return false;
  };

  useEffect(() => {
    isWithin30MinsAndPast15Mins().then((success) => {
      setSuccess(success);
    });
  }, [isSuccess]);

  return (
    <div className="flex">
      <p className="ml-4 mr-2">
        {dayjs(updatedAt).format("YYYY.MM.DD HH:mm:ss")}
      </p>
      {isSuccess ? <div>성공 🔥</div> : <div>실패 😢</div>}
    </div>
  );
};

export default LeaderItem;
