export function getDifficultyClasses(difficulty: string) {
  switch (difficulty.toUpperCase()) {
    case "EASY":
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";

    case "MEDIUM":
      return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

    case "HARD":
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
}