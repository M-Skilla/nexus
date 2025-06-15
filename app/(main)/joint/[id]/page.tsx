import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Examination Overview
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Participating Schools
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="text-muted-foreground h-4 w-4"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-muted-foreground text-xs">+2 from last cycle</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Students
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="text-muted-foreground h-4 w-4"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,250</div>
            <p className="text-muted-foreground text-xs">
              +150 from last cycle
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subjects
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="text-muted-foreground h-4 w-4"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-muted-foreground text-xs">Covering 10 modules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Marking Progress
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="text-muted-foreground h-4 w-4"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-muted-foreground text-xs">
              3 exams fully marked
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Examination Performance Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Placeholder for a chart */}
            <div className="bg-secondary flex h-[350px] w-full items-center justify-center rounded-md">
              <p className="text-muted-foreground">Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                {/* Icon placeholder - e.g., school icon */}
                <div className="ml-4 space-y-1">
                  <p className="text-sm leading-none font-medium">
                    New school 'City High School' registered.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    June 14, 2025, 10:30 AM
                  </p>
                </div>
                {/* <div className="ml-auto font-medium">Details</div> */}
              </div>
              <div className="flex items-center">
                {/* Icon placeholder - e.g., marking icon */}
                <div className="ml-4 space-y-1">
                  <p className="text-sm leading-none font-medium">
                    Physics Paper 1 marking started.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    June 14, 2025, 09:00 AM
                  </p>
                </div>
                {/* <div className="ml-auto font-medium">View Progress</div> */}
              </div>
              <div className="flex items-center">
                {/* Icon placeholder - e.g., calendar/schedule icon */}
                <div className="ml-4 space-y-1">
                  <p className="text-sm leading-none font-medium">
                    Exam schedule published for 'Mid-Year Finals'.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    June 13, 2025, 05:00 PM
                  </p>
                </div>
                {/* <div className="ml-auto font-medium">View Schedule</div> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Examinations</CardTitle>
          <CardDescription>
            A list of current and past examinations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  No. of Candidates
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Exam Date
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Mid-Year Mathematics
                </TableCell>
                <TableCell>Mathematics</TableCell>
                <TableCell>
                  <Badge variant="outline">Active</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">1200</TableCell>
                <TableCell className="hidden md:table-cell">
                  2025-07-15
                </TableCell>
                <TableCell>{/* Placeholder for actions */}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Final English Literature
                </TableCell>
                <TableCell>English</TableCell>
                <TableCell>
                  <Badge variant="secondary">Upcoming</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">1150</TableCell>
                <TableCell className="hidden md:table-cell">
                  2025-08-01
                </TableCell>
                <TableCell>{/* Placeholder for actions */}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Term 1 Physics Practical
                </TableCell>
                <TableCell>Physics</TableCell>
                <TableCell>
                  <Badge>Completed</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">980</TableCell>
                <TableCell className="hidden md:table-cell">
                  2025-03-10
                </TableCell>
                <TableCell>{/* Placeholder for actions */}</TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
