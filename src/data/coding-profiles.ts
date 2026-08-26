export interface CodingProfile {
  label: string
  stat: string
  statLabel: string
  href: string
  iconKey: string
}

export const codingProfiles: CodingProfile[] = [
  {
    label: 'LeetCode',
    stat: '450+',
    statLabel: 'problems solved',
    href: 'https://leetcode.com/thenitinkumar',
    iconKey: 'LeetCode',
  },
{
    label: 'GeeksforGeeks',
    stat: '200+',
    statLabel: 'problems solved',
    href: 'https://geeksforgeeks.org/user/thenitinkumar',
    iconKey: 'GeeksforGeeks',
  },
]
