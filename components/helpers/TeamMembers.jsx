import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const TeamMembers = ({ title, members }) => {
  return (
    <div className="flex flex-col items-center justify-center my-10 md:px-0 px-6">
      <div>
        <div className="my-16 flex items-center gap-3">
          <div className="w-6 h-[2px] bg-secondary-blue" />
          <p className="uppercase font-semibold text-base text-secondary-blue">
            {title}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-[1200px]">
          {members.map((member, index) => (
            <div key={index} className="space-y-4" style={{}}>
              <Image
                src={`/images/team/${member.image}`}
                width={1200}
                height={1200}
                alt={member.name}
                className="w-full max-w-[180px] h-[200px] md:w-[230px] md:h-[350px] object-cover grayscale hover:grayscale-0 transition-all duration-600 ease-in-out"
              />
              <div className="md:text-base text-xs">
                <p className="font-medium text-secondary-blue">{member.name}</p>
                <span className="text-secondary-blue">{member.position}</span>
              </div>
              <div className="flex gap-4 md:text-lg text-sm">
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="hover:text-primary-blue duration-300 transition-colors ease-in-out"
                  >
                    <FaLinkedin />
                  </Link>
                )}
                {member.instagram && (
                  <Link
                    href={member.instagram}
                    target="_blank"
                    className="hover:text-primary-blue duration-300 transition-colors ease-in-out"
                  >
                    <FaInstagram />
                  </Link>
                )}
                {member.facebook && (
                  <Link
                    href={member.facebook}
                    target="_blank"
                    className="hover:text-primary-blue duration-300 transition-colors ease-in-out"
                  >
                    <FaFacebook />
                  </Link>
                )}
                {member.email && (
                  <Link
                    href={`mailto:${member.email}`}
                    target="_blank"
                    className="hover:text-primary-blue duration-300 transition-colors ease-in-out"
                  >
                    <FaEnvelope />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
