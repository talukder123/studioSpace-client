export interface ImyBooking {
    _id: string;
    studioTitle: string;
    category: string;
    location: string;
    hourlyRate: number;
    securityDeposit: number | null;
    userName: string;
    userEmail: string;
    bookingDate: string;
    fromTime: string;
    toTime: string;
    studioId: string;
    imageUrl:string,
    status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}