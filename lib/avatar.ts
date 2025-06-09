export const avatar = (staffRecord: {
  gender: "MALE" | "FEMALE" | "OTHER";
  first_name: string;
  last_name: string;
}) => {
  return `https://avatar.iran.liara.run/public/${staffRecord.gender === "MALE" ? "boy" : "girl"}?username=${staffRecord.first_name}${staffRecord.last_name}`;
};
