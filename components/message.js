export default function Message({ children, avatar, username, description }) {
  return (
    <div className=" bg-indigo-200 p-8 border-b-2 rounded-lg shadow-2xl mb-5">
      <div className="flex items-center gap-1">
        <img src={avatar} alt="user avatar" className="w-10 rounded-full" />
        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p className=" text-base font-normal ">{description}</p>
      </div>
      {children}
    </div>
  );
}
