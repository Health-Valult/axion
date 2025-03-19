// components/ProtectedClientComponent.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';

export default function ProtectedClientComponent({
	children,
	fallback = <div>Loading...</div>,
}: {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}) {
	const { loading, isAuthenticated } = useAuth({ required: true });

	if (loading) return fallback;
	if (!isAuthenticated) return null; // Will redirect in useAuth hook

	return <>{children}</>;
}
