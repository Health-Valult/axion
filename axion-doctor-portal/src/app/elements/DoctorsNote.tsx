import { ReactNode } from 'react';
import { Input } from '@heroui/react';
import { DateInput } from '@heroui/react';
import { Listbox, ListboxItem } from '@heroui/react';
import { Chip } from '@heroui/react';
import { parseZonedDateTime } from '@internationalized/date';

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
	<div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
		{children}
	</div>
);

export const DoctorsNote = ({
	name,
	dateTime,
	indication,
	content,
	treatment,
}: {
	name: string;
	dateTime: string;
	indication: string;
	content: string;
	treatment: string[];
}) => {
	return (
		<div>
			<Input
				isReadOnly
				label="Physician"
				labelPlacement="outside"
				placeholder={name}
				startContent={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-person-circle"
						viewBox="0 0 16 16"
					>
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
						<path
							fillRule="evenodd"
							d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
						/>
					</svg>
				}
				type="text"
				className="mb-2"
			/>

			<div className="w-full max-w-xl flex flex-row gap-4">
				<DateInput
					hideTimeZone
					defaultValue={parseZonedDateTime(dateTime)}
					label="Prescribed Time"
					className="mb-2"
				/>
			</div>

			<Chip isDisabled color="primary" className="my-4">
				{indication}
			</Chip>

			<Input
				isReadOnly
				placeholder={content}
				startContent={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="black"
					>
						<path d="M320-200h320v-80H320v80Zm0-120h320v-80H320v80Zm160-148q66-60 113-106.5t47-97.5q0-36-26-62t-62-26q-21 0-40.5 8.5T480-728q-12-15-31.5-23.5T408-760q-36 0-62 26t-26 62q0 51 45.5 96T480-468ZM720-80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80Zm-480-80h480v-640H240v640Zm0 0v-640 640Z" />
					</svg>
				}
				type="text"
				className="mb-2"
			/>

			<ListboxWrapper>
				<Listbox
					aria-label="Example with disabled actions"
					disabledKeys={treatment}
					onAction={(key) => alert(key)}
				>
					{treatment.map((medicine) => (
						<ListboxItem key={medicine}>{medicine}</ListboxItem>
					))}
				</Listbox>
			</ListboxWrapper>
		</div>
	);
};
