import Image from "next/image";

const RandomAvatar = () => {
  const avatars = [
    "/avatar_inco_1.webp",
    "/avatar_inco_2.webp",
    "/avatar_inco_3.webp",
    "/avatar_inco_4.webp",
    "/avatar_inco_5.webp",
    "/avatar_inco_6.webp",
  ];

  const randomIndex = Math.floor(Math.random() * avatars.length);
  const randomAvatar = avatars[randomIndex];

  return (
    <div>
      <Image src={randomAvatar} alt="Random Avatar" width={100} height={120} />
    </div>
  );
};

export default RandomAvatar;
