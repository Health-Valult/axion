import { Accordion, AccordionItem } from '@heroui/react';

const RecentPatients = () => {
	const itemClasses = {
		base: 'py-0 w-full',
		title: 'font-normal text-medium',
		trigger:
			'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
		indicator: 'text-medium',
		content: 'text-small px-2',
	};

	const defaultContent = 'Brief summary about patient';
	return (
		<div className="flex justify-center items-center mt-14">
			{/* <section className=" ">
            <ul className="max-w-md divide-y divide-gray-200 ">
                <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="shrink-0">
                            <img src='https://i.pravatar.cc/300?u=a042581f4e29026709d' className="w-8 h-8 rounded-full"  alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate ">
                            Neil Sims
                            </p>
                            <p className="text-sm text-gray-500 truncate ">
                            Cardiac Patient
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            3201354
                        </div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="shrink-0">
                            <img src='https://i.pravatar.cc/300?u=a042581f4e29026709d' className="w-8 h-8 rounded-full"  alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                            Bonnie Green
                            </p>
                            <p className="text-sm text-gray-500 truncate ">
                            Cardiac Patient
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            3467165
                        </div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="shrink-0">
                            <img src='https://i.pravatar.cc/300?u=a042581f4e29026709d' className="w-8 h-8 rounded-full"  alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                            Michael Gough
                            </p>
                            <p className="text-sm text-gray-500 truncate ">
                            Cholestrol Patient
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            6564798
                        </div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="shrink-0">
                            <img src='https://i.pravatar.cc/300?u=a042581f4e29026709d' className="w-8 h-8 rounded-full"  alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                            Thomas Lean
                            </p>
                            <p className="text-sm text-gray-500 truncate ">
                            Cardiac Patient
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            2367235
                        </div>
                    </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="shrink-0">
                            <img src='https://i.pravatar.cc/300?u=a042581f4e29026709d' className="w-8 h-8 rounded-full"  alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                            Lana Byrd
                            </p>
                            <p className="text-sm text-gray-500 truncate ">
                            Diabetes Patient
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            3675641
                        </div>
                    </div>
                </li>
            </ul>
        </section> */}
			<Accordion
				className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
				itemClasses={itemClasses}
				showDivider={false}
				variant="shadow"
			>
				<AccordionItem
					key="1"
					aria-label="Neil Sims"
					startContent={
						<img
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
							className="w-8 h-8 rounded-full"
							alt="Neil image"
						/>
					}
					subtitle={<p className="flex">Cardiac Patient</p>}
					title="Neil Sims"
				>
					{defaultContent}
				</AccordionItem>
				<AccordionItem
					key="2"
					aria-label="Bonnie Green"
					startContent={
						<img
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
							className="w-8 h-8 rounded-full"
							alt="Neil image"
						/>
					}
					subtitle="Cardiac Patient"
					title="Bonnie Green"
				>
					{defaultContent}
				</AccordionItem>
				<AccordionItem
					key="3"
					aria-label="Michael Gough"
					classNames={{ subtitle: 'text-warning' }}
					startContent={
						<img
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
							className="w-8 h-8 rounded-full"
							alt="Neil image"
						/>
					}
					subtitle="Cholesterol Patient"
					title="Michael Gough"
				>
					{defaultContent}
				</AccordionItem>
				<AccordionItem
					key="4"
					aria-label="Lana Byrd"
					classNames={{ subtitle: 'text-danger' }}
					startContent={
						<img
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
							className="w-8 h-8 rounded-full"
							alt="Neil image"
						/>
					}
					subtitle="Diabetes Patient"
					title={<p className="flex gap-1 items-center">Lana Byrd</p>}
				>
					{defaultContent}
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default RecentPatients;
