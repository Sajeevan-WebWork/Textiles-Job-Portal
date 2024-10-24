import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const Input = ({ icon: Icon, type, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle between password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Determine the input type (either "text" or "password")
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="relative mb-6">
            {/* Icon on the left */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="size-5 text-green-500" />
            </div>

            <input
                {...props}
                type={inputType}  // Dynamically change the input type
                className="w-full pl-10 pr-10 py-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
            />

            {/* Show/hide password toggle */}
            {type === 'password' && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                        type="button"
                        className="text-green-500 focus:outline-none"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <EyeClosed className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Input;
