import whiteLogo from '../assets/resto-flow-logo-white.jpg'
import blackLogo from '../assets/resto-flow-logo.2.jpg'
import { useDarkMode } from '../hooks/use-mode'

export const Logo = () => {
  const { isDarkMode } = useDarkMode()

  const renderWhiteLogo = () => <img className="mr-3 h-6 sm:h-9" src={whiteLogo} alt="logo" />
  const renderBlackLogo = () => <img className="mr-3 h-6 sm:h-9" src={blackLogo} alt="logo" />

  return isDarkMode ? renderWhiteLogo() : renderBlackLogo()
}
