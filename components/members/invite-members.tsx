"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const InviteMembers = () => {
  const [emails, setEmails] = useState([""]);

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleInvite = () => {
    console.log("Inviting members:", emails);
    // Add logic to send invitations
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Invite Members</Button>
      </SheetTrigger>
      <SheetContent>
        <h2 className="mb-4 text-xl font-bold">Invite Members</h2>
        {emails.map((email, index) => (
          <Input
            key={index}
            value={email}
            onChange={(e) => handleEmailChange(index, e.target.value)}
            placeholder="Enter email"
            className="mb-2"
          />
        ))}
        <Button onClick={addEmailField} className="mb-4">
          Add Email
        </Button>
        <Button onClick={handleInvite}>Send Invitations</Button>
      </SheetContent>
    </Sheet>
  );
};

export default InviteMembers;
