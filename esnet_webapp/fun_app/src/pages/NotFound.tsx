
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl font-bold text-neural-green">404 - Page Not Found</h1>
        <p className="text-lg text-neural-blue">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild variant="outline" className="border-neural-green text-neural-green hover:bg-neural-green/10">
          <Link to="/">Return to Neural Network</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
