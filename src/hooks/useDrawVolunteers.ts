import { Volunteer } from '@/types/interfaces';

const useDrawVolunteers = () => {
  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (volunteers: Volunteer[]): Volunteer[] => {
    const shuffled = shuffleArray(volunteers);
    for (let i = 0; i < volunteers.length - 1; i++) {
      if (volunteers[i].id === shuffled[i].id) {
        [shuffled[i], shuffled[i + 1]] = [shuffled[i + 1], shuffled[i]];
      }
    }

    if (
      shuffled[shuffled.length - 1].id === volunteers[shuffled.length - 1].id
    ) {
      const j = Math.floor(Math.random() * (shuffled.length - 1));
      [shuffled[j], shuffled[shuffled.length - 1]] = [
        shuffled[shuffled.length - 1],
        shuffled[j],
      ];
    }

    return volunteers.map((volunteer, index) => ({
      ...volunteer,
      target: shuffled[index].id,
    }));
  };
};

export default useDrawVolunteers;
