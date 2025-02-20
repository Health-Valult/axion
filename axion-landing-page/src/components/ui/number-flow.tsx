'use client';

// import NumberFlow from '@number-flow/react';
import NumberFlow, { type Format } from '@number-flow/react';

interface NumberFlowProps {
	value: number;
	format?: Format;
	locales?: string | string[];
	prefix?: string;
	suffix?: string;
	spinTiming?: EffectTiming;
	willChange?: boolean;
}

export default function NumberFlowWrapper({
	value,
	format = {},
	locales,
	prefix,
	suffix,
	spinTiming,
	willChange = false,
}: NumberFlowProps) {
	return (
		<NumberFlow
			value={value}
			format={format}
			locales={locales}
			prefix={prefix}
			suffix={suffix}
			spinTiming={spinTiming}
			willChange={willChange}
		/>
	);
}
