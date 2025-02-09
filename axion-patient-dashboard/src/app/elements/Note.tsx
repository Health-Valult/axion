import React from 'react';
import { Textarea } from '@heroui/react';

export default function Note() {
	const [value, setValue] = React.useState('');

	return (
		<div className="w-full flex flex-col gap-2 max-w-full">
			<Textarea
				isClearable
				label="Description"
				labelPlacement="outside"
				placeholder="Use this area for notes"
				value={value}
				variant="faded"
				onValueChange={setValue}
			/>
		</div>
	);
}
