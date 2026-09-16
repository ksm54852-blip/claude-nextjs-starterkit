"use client"

import type { ReactNode } from "react"
import { toast } from "sonner"
import { BellIcon, InfoIcon, TrashIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      {children}
    </div>
  )
}

export function ComponentGallery() {
  return (
    <Tabs defaultValue="basic">
      <TabsList>
        <TabsTrigger value="basic">기본</TabsTrigger>
        <TabsTrigger value="input">입력</TabsTrigger>
        <TabsTrigger value="feedback">피드백</TabsTrigger>
        <TabsTrigger value="overlay">오버레이</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="flex flex-col gap-8 pt-6">
        <Section title="Button">
          <div className="flex flex-wrap items-center gap-2">
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </Section>

        <Section title="Badge">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="outline">외곽선</Badge>
            <Badge variant="destructive">경고</Badge>
          </div>
        </Section>

        <Section title="Avatar / Separator">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>KR</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="h-8" />
            <Avatar>
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        <Section title="Card">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>
                카드 설명이 들어가는 자리입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              본문 영역입니다. 원하는 내용을 자유롭게 배치하세요.
            </CardContent>
            <CardFooter>
              <Button size="sm">확인</Button>
            </CardFooter>
          </Card>
        </Section>
      </TabsContent>

      <TabsContent value="input" className="flex flex-col gap-8 pt-6">
        <Section title="Input / Textarea">
          <div className="flex max-w-sm flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-input">이름</Label>
              <Input id="demo-input" placeholder="입력해주세요" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-textarea">메모</Label>
              <Textarea id="demo-textarea" placeholder="여러 줄 입력" />
            </div>
          </div>
        </Section>

        <Section title="Checkbox / Switch">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="demo-checkbox" defaultChecked />
              <Label htmlFor="demo-checkbox">알림 받기</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="demo-switch" defaultChecked />
              <Label htmlFor="demo-switch">자동 저장</Label>
            </div>
          </div>
        </Section>
      </TabsContent>

      <TabsContent value="feedback" className="flex flex-col gap-8 pt-6">
        <Section title="Alert">
          <div className="flex flex-col gap-3">
            <Alert>
              <InfoIcon />
              <AlertTitle>안내</AlertTitle>
              <AlertDescription>
                기본 스타일의 알림 메시지입니다.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <TrashIcon />
              <AlertTitle>주의</AlertTitle>
              <AlertDescription>
                되돌릴 수 없는 작업입니다. 신중하게 진행하세요.
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Toast (sonner)">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success("저장되었습니다.")}
            >
              성공
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("문제가 발생했습니다.")}
            >
              실패
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast("알림", { description: "설명이 포함된 토스트입니다." })
              }
            >
              <BellIcon />
              설명 포함
            </Button>
          </div>
        </Section>

        <Section title="Skeleton">
          <div className="flex max-w-sm items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </Section>
      </TabsContent>

      <TabsContent value="overlay" className="flex flex-col gap-8 pt-6">
        <Section title="Dialog">
          <Dialog>
            <DialogTrigger render={<Button variant="outline">열기</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>정말 삭제할까요?</DialogTitle>
                <DialogDescription>
                  이 작업은 되돌릴 수 없습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">취소</Button>} />
                <DialogClose
                  render={<Button variant="destructive">삭제</Button>}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Tooltip">
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline">마우스를 올려보세요</Button>}
            />
            <TooltipContent>도움말이 여기에 표시됩니다.</TooltipContent>
          </Tooltip>
        </Section>

        <Section title="Accordion">
          <Accordion className="max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                스타터 킷에 무엇이 들어있나요?
              </AccordionTrigger>
              <AccordionContent>
                Next.js, Tailwind CSS v4, shadcn/ui, 다크 모드, 폼, 데이터 패칭
                설정이 모두 포함되어 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>컴포넌트는 어떻게 추가하나요?</AccordionTrigger>
              <AccordionContent>
                npx shadcn@latest add [이름] 명령으로 필요한 것만 추가하면
                됩니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>
      </TabsContent>
    </Tabs>
  )
}
