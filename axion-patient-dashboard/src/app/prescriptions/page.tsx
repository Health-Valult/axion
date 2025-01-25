"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "@heroui/react";
import { DatePicker } from "@heroui/react";
import {DateRangePicker} from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";

const Prescriptions: React.FC = () => {
  const [action, setAction] = useState<string | null>(null);
  const [defaultDate, setDefaultDate] = useState<any>(null);

  useEffect(() => {
    setDefaultDate(now(getLocalTimeZone())); // Ensures it only runs on the client
  }, []);

  return (
    <div className="p-4 sm:ml-64 mt-14 flex justify-center items-center min-h-[calc(100vh-56px)]">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <Form
          className="w-full flex flex-col gap-4"
          validationBehavior="native"
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));
            setAction(`submit ${JSON.stringify(data)}`);
          }}
        >
          <div className="w-full flex flex-row gap-4">
            {defaultDate && (
              <DatePicker
                hideTimeZone
                showMonthAndYearPickers
                defaultValue={defaultDate}
                label="Prescribed Date"
                variant="bordered"
              />
            )}
          </div>

          <Input
            isRequired
            errorMessage="Please enter a valid diagnosis"
            label="Diagnosis"
            labelPlacement="outside"
            name="diagnosis"
            placeholder="Enter patient's diagnosis"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter valid directions"
            label="Sig"
            labelPlacement="outside"
            name="directions"
            placeholder="Enter clear dosage directions"
            type="text"
          />

            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <DateRangePicker label="Treatment Duration" visibleMonths={2} />
            </div>

          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button type="reset" variant="flat">
              Reset
            </Button>
          </div>

          {action && (
            <div className="text-small text-default-500">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Prescriptions;
