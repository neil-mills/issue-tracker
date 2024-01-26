import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
	const issues = await prisma.issue.findMany()
	return NextResponse.json(issues)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if(!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  const { title, description } = body
  const issue = await prisma.issue.create({
    data: { title, description }
  })
  return NextResponse.json(issue, { status: 201 })

}