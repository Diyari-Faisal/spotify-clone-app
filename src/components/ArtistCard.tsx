interface props {
    artistPic: string,
    artistName: string
}

const ArtistCard = ({ artistPic, artistName }: props) => {
  return (
    <div className="flex flex-col items-center">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-0 overflow-hidden shadow-xl transform transition duration-300 hover:-translate-y-3 group hover:ring-4 hover:ring-indigo-300">
        <img src={artistPic} alt={artistName} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        <p className="text-white mt-2">{artistName}</p>
    </div>
  )
}

export default ArtistCard
