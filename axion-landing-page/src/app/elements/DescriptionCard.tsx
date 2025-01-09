'use client'

import React from 'react'
import {Card, CardHeader, CardBody} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";

interface DescriptionCardProps {
  heading: String; 
  description: String;
  Icon: React.ReactNode;
}


export default function DescriptionCard({heading, description, Icon} : DescriptionCardProps) {
  return (
    <Card className="max-w-[400px] text-black">
      <CardHeader className="flex gap-3">
      {Icon}
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{heading}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}.</p>
      </CardBody>
    </Card>
  )
}
