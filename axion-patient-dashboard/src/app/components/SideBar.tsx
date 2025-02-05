import Link from "next/link";


export default function SideBar() {
  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 " aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
            <ul className="space-y-2 font-medium">
                <li>
                    <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                    <svg width="19" height="19" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.5272 25.1926V15.33C30.5272 14.3801 30.5264 13.9049 30.4084 13.4629C30.3039 13.0712 30.1323 12.7005 29.9 12.3655C29.6379 11.9875 29.2735 11.6741 28.5433 11.0486L19.8276 3.58219C18.4719 2.42084 17.794 1.84046 17.0312 1.61959C16.359 1.42498 15.6425 1.42498 14.9703 1.61959C14.208 1.84029 13.5312 2.42013 12.1775 3.57972L3.45886 11.0486C2.72867 11.6741 2.36442 11.9875 2.10233 12.3655C1.87007 12.7005 1.69713 13.0712 1.59258 13.4629C1.47461 13.9049 1.47461 14.3801 1.47461 15.33V25.1926C1.47461 26.8492 1.47461 27.6772 1.75105 28.3306C2.11963 29.2018 2.82614 29.8948 3.71597 30.2556C4.38335 30.5263 5.22941 30.5263 6.92151 30.5263C8.61361 30.5263 9.4606 30.5263 10.128 30.2556C11.0178 29.8948 11.7241 29.2019 12.0927 28.3308C12.3692 27.6774 12.3693 26.8491 12.3693 25.1924V23.4147C12.3693 21.4511 13.9953 19.8593 16.0009 19.8593C18.0066 19.8593 19.6325 21.4511 19.6325 23.4147V25.1924C19.6325 26.8491 19.6325 27.6774 19.9089 28.3308C20.2775 29.2019 20.984 29.8948 21.8739 30.2556C22.5412 30.5263 23.3873 30.5263 25.0794 30.5263C26.7715 30.5263 27.6185 30.5263 28.2859 30.2556C29.1757 29.8948 29.882 29.2018 30.2506 28.3306C30.527 27.6772 30.5272 26.8492 30.5272 25.1926Z" fill="black" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="ms-3">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                    <svg width="19" height="19" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1583 37.5261H7.26367V24.0895C7.26367 23.0726 7.26367 22.5637 7.46158 22.1753C7.63566 21.8336 7.91324 21.5561 8.2549 21.382C8.64332 21.1841 9.15128 21.1841 10.1682 21.1841H18.1583V11.3791C18.1583 10.3621 18.1583 9.85328 18.3562 9.46486C18.5303 9.1232 18.8079 8.84563 19.1496 8.67154C19.538 8.47363 20.0459 8.47363 21.0629 8.47363H26.1471C27.164 8.47363 27.6735 8.47363 28.0619 8.67154C28.4036 8.84563 28.6803 9.1232 28.8544 9.46486C29.0523 9.85328 29.053 10.3621 29.053 11.3791V15.7367H37.0424C38.0594 15.7367 38.5693 15.7367 38.9577 15.9347C39.2993 16.1087 39.575 16.3863 39.7491 16.728C39.947 17.1164 39.9477 17.6252 39.9477 18.6422V37.5263L29.053 37.5261H18.1583Z" fill="white"/>
                        <path d="M18.1583 21.1841V37.5261M18.1583 21.1841H10.1682C9.15128 21.1841 8.64332 21.1841 8.2549 21.382C7.91324 21.5561 7.63566 21.8336 7.46158 22.1753C7.26367 22.5637 7.26367 23.0726 7.26367 24.0895V37.5261H18.1583M18.1583 21.1841V11.3791C18.1583 10.3621 18.1583 9.85328 18.3562 9.46486C18.5303 9.1232 18.8079 8.84563 19.1496 8.67154C19.538 8.47363 20.0459 8.47363 21.0629 8.47363H26.1471C27.164 8.47363 27.6735 8.47363 28.0619 8.67154C28.4036 8.84563 28.6803 9.1232 28.8544 9.46486C29.0523 9.85328 29.053 10.3621 29.053 11.3791V15.7367M18.1583 37.5261H29.053M29.053 37.5261L39.9477 37.5263V18.6422C39.9477 17.6252 39.947 17.1164 39.7491 16.728C39.575 16.3863 39.2993 16.1087 38.9577 15.9347C38.5693 15.7367 38.0594 15.7367 37.0424 15.7367H29.053M29.053 37.5261V15.7367" stroke="#17191C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="ms-3">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/diagnosis" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-lungs-fill" viewBox="0 0 16 16">
                        <path d="M8 1a.5.5 0 0 1 .5.5v5.243L9 7.1V4.72C9 3.77 9.77 3 10.72 3c.524 0 1.023.27 1.443.592.431.332.847.773 1.216 1.229.736.908 1.347 1.946 1.58 2.48.176.405.393 1.16.556 2.011.165.857.283 1.857.24 2.759-.04.867-.232 1.79-.837 2.33-.67.6-1.622.556-2.741-.004l-1.795-.897A2.5 2.5 0 0 1 9 11.264V8.329l-1-.715-1 .715V7.214c-.1 0-.202.03-.29.093l-2.5 1.786a.5.5 0 1 0 .58.814L7 8.329v2.935A2.5 2.5 0 0 1 5.618 13.5l-1.795.897c-1.12.56-2.07.603-2.741.004-.605-.54-.798-1.463-.838-2.33-.042-.902.076-1.902.24-2.759.164-.852.38-1.606.558-2.012.232-.533.843-1.571 1.579-2.479.37-.456.785-.897 1.216-1.229C4.257 3.27 4.756 3 5.28 3 6.23 3 7 3.77 7 4.72V7.1l.5-.357V1.5A.5.5 0 0 1 8 1m3.21 8.907a.5.5 0 1 0 .58-.814l-2.5-1.786A.5.5 0 0 0 9 7.214V8.33z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Diagnosis</span>
                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ">Pro</span>
                    </Link>
                </li>
                <li>
                    <Link href="/lab-reports" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-clipboard2-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.058.501a.5.5 0 0 0-.5-.501h-2.98c-.276 0-.5.225-.5.501A.5.5 0 0 1 5.582 1a.497.497 0 0 0-.497.497V2a.5.5 0 0 0 .5.5h4.968a.5.5 0 0 0 .5-.5v-.503A.497.497 0 0 0 10.555 1a.5.5 0 0 1-.497-.499"/>
                        <path fillRule="evenodd" d="M4.174 1h-.57a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5h-.642q.084.236.085.5V2c0 .828-.668 1.5-1.492 1.5H5.581A1.496 1.496 0 0 1 4.09 2v-.5q.001-.264.085-.5Zm3.894 5.482c1.656-1.673 5.795 1.254 0 5.018-5.795-3.764-1.656-6.69 0-5.018"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Lab Reports</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">3</span>
                    </Link>
                </li>
                <li>
                    <Link href="/history" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-clipboard-pulse" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1H3a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3.5a1 1 0 0 0-1-1h-1v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2m6.979 3.856a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.895-.133L4.232 10H3.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .416-.223l1.41-2.115 1.195 3.982a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h1.5a.5.5 0 0 0 0-1h-1.128z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">History</span>
                    </Link>
                </li>
                <li>
                    <Link href="/prescriptions" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-prescription" viewBox="0 0 16 16">
                        <path d="M5.5 6a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V9h.293l2 2-1.147 1.146a.5.5 0 0 0 .708.708L9 11.707l1.146 1.147a.5.5 0 0 0 .708-.708L9.707 11l1.147-1.146a.5.5 0 0 0-.708-.708L9 10.293 7.695 8.987A1.5 1.5 0 0 0 7.5 6zM6 7h1.5a.5.5 0 0 1 0 1H6z"/>
                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Prescription</span>
                    </Link>
                </li>
                
            </ul>
        </div>
        </aside>
  );
}