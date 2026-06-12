import { getSession } from "@/lib/get-Session";
import Header from "./header";


const HeaderWrapper = async () => {

    let session = null;

    try {
        session = await getSession();
    } catch (error) {
        console.error("Session error:", error);
    }

    return (
        <div>
            <Header {...session} />
        </div>
    );
};

export default HeaderWrapper;
