import { memo } from "react";
import { useState } from "react";
import RecoverPassword from "../RecoverPassword";
import CreateAccount from "../CreateAccount";
import Login from "../Login";
import ThemeSwitcher from "@/components/ThemeSwitcher";


const Auth = () => {
    const [authStep, setAuthStep] = useState(0);

    return (
        <div className="flex justify-center items-center h-screen relative">
            <ThemeSwitcher className="absolute top-4 right-4" />
            <div className="w-full min-w-[300px] md:w-[70%] flex justify-center items-center bg-background p-3 rounded-lg shadow-lg shadow-background-500/50">
                <div className="min-h-full hidden bg-gradient-to-r from-primary to-secondary xl:flex xl:w-1/2 xl:rounded-l-lg xl:rounded-r-sm xl:h-[580px]
                    justify-center items-center">
                </div>
                <div className="
                    bg-background rounded-lg w-[90%]  
                    p-4 xl:rounded-r-lg xl:rounded-l-none xl:w-1/2 flex flex-col items-center justify-center xl:h-[580px]">
                    <Login visible={authStep === 0} setAuthStep={setAuthStep} authStep={authStep} />
                    <RecoverPassword visible={authStep === 1} setAuthStep={setAuthStep} authStep={authStep} />
                    <CreateAccount visible={authStep === 2} setAuthStep={setAuthStep} authStep={authStep} />
                </div>
            </div>
        </div>
    )
}


export default memo(Auth)
