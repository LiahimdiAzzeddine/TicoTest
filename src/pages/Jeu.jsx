import JeuPage from "../components/JeuPage";


export default function Jeu() {
    return (
         <>
                 <div className="md:h-16 lg:h-20 h-14"></div>
                <div className="flex flex-col justify-center gap-y-8 2xl:gap-y-14 md:gap-x-12 lg:gap-x-20 px-4 md:px-8 lg:px-12 py-8 max-w-screen-lg 2xl:max-w-screen-xl mx-auto min-h-full md:pb-40 pb-16">
                   <JeuPage/>
                    </div>
                </>


    );
}
