import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/themeSlice';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle = ({ 
  size = 'md', 
  showLabel = false,
  className = '' 
}: ThemeToggleProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const isDark = theme === 'dark';

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';

  const sunRays = [
    { rotate: 0, delay: 0 },
    { rotate: 45, delay: 0.05 },
    { rotate: 90, delay: 0.1 },
    { rotate: 135, delay: 0.15 },
    { rotate: 180, delay: 0.2 },
    { rotate: 225, delay: 0.25 },
    { rotate: 270, delay: 0.3 },
    { rotate: 315, delay: 0.35 },
  ];

  const moonStars = [
    { x: -12, y: -8, size: 2, delay: 0.1 },
    { x: 10, y: -6, size: 3, delay: 0.2 },
    { x: 8, y: 8, size: 2, delay: 0.3 },
    { x: -8, y: 10, size: 2.5, delay: 0.15 },
  ];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      className={`relative rounded-full overflow-hidden group transition-all duration-500 ${
        isDark 
          ? 'bg-secondary/50 hover:bg-secondary' 
          : 'bg-primary/10 hover:bg-primary/20'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark 
            ? '0 0 20px hsla(262, 83%, 68%, 0.3), inset 0 0 10px hsla(262, 83%, 68%, 0.1)'
            : '0 0 25px hsla(45, 100%, 60%, 0.4), inset 0 0 10px hsla(45, 100%, 70%, 0.2)'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Rotating background */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
            isDark ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, hsl(262, 83%, 68%), transparent 60%)'
          }}
        />
      </motion.div>

      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1],
                scale: { type: 'spring', stiffness: 200, damping: 15 }
              }}
              className="relative"
            >
              <Moon 
                className="text-accent transition-colors duration-300" 
                style={{ width: iconSize, height: iconSize }}
              />
              
              {/* Animated stars around moon */}
              {moonStars.map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ 
                    left: '50%', 
                    top: '50%',
                    width: star.size,
                    height: star.size,
                  }}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0.7, 1],
                    scale: [0, 1.2, 0.8, 1],
                    x: star.x,
                    y: star.y,
                  }}
                  transition={{
                    delay: star.delay,
                    duration: 0.4,
                    opacity: {
                      delay: star.delay,
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }
                  }}
                >
                  <Sparkles 
                    className="text-accent/70" 
                    style={{ width: star.size * 3, height: star.size * 3 }} 
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1],
                scale: { type: 'spring', stiffness: 200, damping: 15 }
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sun 
                  className="text-yellow-500" 
                  style={{ width: iconSize, height: iconSize }}
                />
              </motion.div>

              {/* Animated sun rays */}
              {sunRays.map((ray, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-0.5 bg-yellow-400/60"
                  style={{
                    height: 4,
                    transformOrigin: 'center',
                    marginLeft: -1,
                    marginTop: -iconSize - 4,
                  }}
                  initial={{ opacity: 0, scaleY: 0, rotate: ray.rotate }}
                  animate={{ 
                    opacity: [0.4, 0.8, 0.4],
                    scaleY: [0.5, 1, 0.5],
                    rotate: ray.rotate 
                  }}
                  transition={{
                    delay: ray.delay,
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        whileTap={{ scale: 0.9 }}
      />

      {/* Label */}
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-2 text-sm font-medium"
        >
          {isDark ? 'Dark' : 'Light'}
        </motion.span>
      )}
    </Button>
  );
};
