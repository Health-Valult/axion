import React from 'react'
import {Checkbox, Link, User, Chip, cn} from "@heroui/react";

export const Tasks = ({name, date, time}: {name:string, date: string, time: string}) => {
  return (
    <Checkbox
      aria-label={name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        label: "w-full",
      }}
      value={name}
    >
      <div className="w-full flex justify-between gap-2">
        {time}
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">{name}</span>
          
        </div>
      </div>
    </Checkbox>
  )
}
