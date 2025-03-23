// Get user location and IP
interface UserLocation {
	Latitude: number;
	Longitude: number;
}

// Properly type the setState functions
type SetUserLocation = React.Dispatch<React.SetStateAction<UserLocation>>;
type SetUserIP = React.Dispatch<React.SetStateAction<string>>;

export function fetchLocationData(
	setUserLocation: SetUserLocation,
	setUserIP: SetUserIP
): void {
	const location: UserLocation = {
		Latitude: 6.8998,
		Longitude: 79.8536,
	};
	const ip: string = '192.168.1.1';

	setUserLocation(location);
	setUserIP(ip);
}
