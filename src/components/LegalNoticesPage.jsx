import React from 'react'
import SubTitle from './ui/SubTitle'

const LegalNoticesPage = () => {
    return (
        <div className="flex flex-col w-full max-w-6xl gap-8 md:gap-16 min-h-screen">
            <SubTitle center={false}>
                <span className="text-[#0a548d]">Mentions &nbsp;</span>
                <span className="text-[#ff8300] font-bold">légales​</span>{" "}
            </SubTitle>
            <div className="flex flex-col items-start justify-center w-full gap-12 ">
                {/* Description */}
                <div className="max-w-4xl text-start">
                    <h4 className='ArchivoBold font-bold text-[#0a548d]'>Editeur du site</h4>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold">
                        « FOODHEA » via la SAS FEELOFOOD, Société par action simplifiée, immatriculée au R.C.S. de Poitiers
                        sous le n°883 111 528, dont le siège social est situé à 7 avenue du Tour de France BP 70183 86961 FUTUROSCOPE CHASSENEUIL CEDEX.
                        N° SIRET : 883 111 528 00021 N° TVA Intracommunautaire : FR 883 111 528
                        Coordonnées : contact@foodhea.com
                    </p>
                </div>
                <div className="max-w-4xl text-start">
                    <h4 className='ArchivoBold font-bold text-[#0a548d]'>Directeur de publication​</h4>
                    <p className="text-lg text-[#0a548d] ArchivoLight leading-tight font-bold">
                        Marion Van Lissum en sa qualité de représentant légal de la SAS
                    </p>
                </div>
                <div className="max-w-4xl text-start">
                    <a
                        href="/pdfs/CGU.pdf"
                        target="_blank"
                        rel="noopener noreferrer" className='ArchivoBold font-bold text-[#0a548d]'>CGU TiCO​​</a>
                </div>
            </div>
        </div>
    )
}

export default LegalNoticesPage
