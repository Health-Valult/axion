"use client"

import React, { useState } from "react";
import {
  Button,
  useDisclosure,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import {Form, Input} from "@heroui/react";
import {DateInput} from "@heroui/date-input";
import {TimeInput} from "@heroui/react";
import {Time, DateValue, getLocalTimeZone, today} from "@internationalized/date";
import { Appointment } from "../types/types";

export const TaskList = ({setAppointments}: {setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    
    const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
    const [time, setTime] = useState<Time | null>(null);

    const handleOpen = () => {
        onOpen();
      };
  
    return (
      <>
        <div className="flex flex-wrap gap-3">
            <Button onPress={() => handleOpen()}>
              Add task
            </Button>
        </div>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <Form
                  className="w-full max-w-full flex flex-col gap-4"
                  validationBehavior="native"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formDataObject = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

                    if (date && time) {
                      setAppointments((prev) => [
                        ...prev,
                        { 
                          name: formDataObject.appointment, 
                          date: date.toString(),  // Convert DateValue to string
                          time: time.toString()   // Convert Time to string
                        }
                      ]);
                    }

                  }}
                >

                <DateInput label="Date" value={date} isReadOnly />

                <TimeInput label="Time" value={time} onChange={setTime} />

                  <Input
                    isRequired
                    isClearable
                    errorMessage="Please complete this field"
                    label="Appointment"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Schedule your appointment"
                    type="text"
                  />

                  <div className="flex gap-2">
                    <Button color="primary" type="submit">
                      Add
                    </Button>
                    <Button type="reset" variant="flat">
                      Clear
                    </Button>
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      </>
    );
}
