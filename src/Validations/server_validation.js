class ServerValidation {
    static validateServerName(name) {
      if (!name.trim()) {
        return 'Please enter server name';
      }
      return '';
    }
  
    static validateServerHost(host) {
      if (!host.trim()) {
        return 'Please enter server host';
      } else if (!/^[0-9.]+$/.test(host)) {
        return 'Invalid host format';
      }
      return '';
    }
  
    static validatePorts(ports) {
      for (const port of ports) {
        if (!port.ports || !port.serviceName) {
          return 'Please fill all port details';
        }
      }
      return '';
    }
  }

  export default ServerValidation