"use client"

import React, { useState } from 'react'
import {Tabs, Tab, Card, CardBody} from "@heroui/react";
import { TaskList } from './TaskList'
import { Calendar } from '@nextui-org/react'
import {today, getLocalTimeZone} from "@internationalized/date";
import RecentPatients from '../elements/RecentPatients';
import Note from '../elements/Note';
import {CheckboxGroup} from "@heroui/react";
import { Appointment } from '../types/types';
import { Tasks } from '../elements/Tasks';


export const Appointments = () => {
    const [selected, setSelected] = useState<string>("recent");
    const [appointments, setAppointments] = useState<Appointment[]>([]);
  return (

    <div className="flex flex-col w-full">
      <Card className="max-w-full w-full h-full">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={(key) => setSelected(String(key))}
          >
            <Tab key="recent" title="Recent Patients">
              <RecentPatients />
            </Tab>
            <Tab key="appointments" title="Appointments">
              <div className="flex gap-4 h-full">  
      
                <div className="w-1/2">
                  <Calendar isReadOnly aria-label="Date (Read Only)" value={today(getLocalTimeZone())} />
                </div>


                <div className="w-1/2 flex flex-col gap-4">
                  <CheckboxGroup
                    classNames={{
                      base: "w-full",
                    }}
                    label="Today's tasks"
                  >
                    {appointments.map((appointment) => (
                      <Tasks key={appointment.time} name={appointment.name} date={appointment.date} time={appointment.time} />
                    ))}
                  </CheckboxGroup>

                  <div className="flex gap-2 justify-center">
                    <TaskList setAppointments={setAppointments} />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab key="notes" title="Notes">
              <Note />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
