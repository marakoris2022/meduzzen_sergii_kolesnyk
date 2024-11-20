import { ActionProps, UserItem } from "@/interface/interface";

export function resolveMemberLabel(
  memberId: number,
  companyMembers: (UserItem & ActionProps)[]
) {
  const member = companyMembers.find((member) => member.user_id === memberId);
  return member?.user_email || String(memberId);
}
