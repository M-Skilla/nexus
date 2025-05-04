"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { School } from "@/lib/types";
import { useRouter } from "next/navigation";

interface SchoolCardProps {
  school: School["school"];
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/school/${school.id}`);
  };

  return (
    <Card
      className="hover:bg-accent cursor-pointer transition-colors"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{school.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground pb-2 text-sm">
        <p>{school.address}</p>
        <p>
          {school.city}, {school.region}
        </p>
        <p>{school.country}</p>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        <p>Email: {school.email}</p>
      </CardFooter>
    </Card>
  );
}
