import React,{useState} from 'react'

function Button( {   
    children, 
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);
    const buttonStyles = {
        backgroundColor: isHovered ? "blue" : "darkblue",
        color: "white",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.1s ease-in-out",
        boxShadow: isHovered ? '0px 0px 8px rgba(0, 0, 0, 0.5)' : 'none',
        transform: isHovered ? 'scale(1.05)' : 'scale(1.02)',
        fontWeight: "bold",
        textShadow: isHovered ? '6px 6px 10px rgba(0, 0, 0, 0.8)' : '1px 1px 2px rgba(0, 0, 0, 0.3)'
    };
   return (
    <div>
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${className}`}
            style={buttonStyles}
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
            {...props}
        >
            {children}
        </button>
    </div>
  );
}

export default Button
