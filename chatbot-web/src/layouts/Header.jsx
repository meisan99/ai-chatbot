import { APP_NAME, PROJECT_URL } from "../config";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        {PROJECT_URL ? (
          <a
            href={PROJECT_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:no-underline"
          >
            View Source
          </a>
        ) : null}
      </div>
    </header>
  );
};
