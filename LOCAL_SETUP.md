# Local Development Setup Instructions

## Configure /etc/hosts

To test the multi-domain setup locally, you need to add domain mappings to your `/etc/hosts` file.

### Steps:

1. Open Terminal and edit the hosts file:
   ```bash
   sudo nano /etc/hosts
   ```

2. Add these lines at the end of the file:
   ```
   127.0.0.1 thedarkandbright.com
   127.0.0.1 lpk.thedarkandbright.com
   127.0.0.1 admin.thedarkandbright.com
   ```

3. Save and exit (Ctrl+O, Enter, Ctrl+X)

4. Flush DNS cache (optional but recommended):
   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

## Start Development Server

Run the Laravel development server:
```bash
php artisan serve
```

## Access the Domains

Once the server is running, access the domains:

- **Agency Website**: http://thedarkandbright.com:8000
- **LPK Landing Page**: http://lpk.thedarkandbright.com:8000
- **Admin Dashboard**: http://admin.thedarkandbright.com:8000

## Admin Login Credentials

- **Email**: admin@thedarkandbright.com
- **Password**: password

## Database

The project is currently using SQLite for local development. To switch to MySQL:

1. Install and start MySQL
2. Create database: `CREATE DATABASE dnb_agency;`
3. Update `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=dnb_agency
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```
4. Run migrations: `php artisan migrate:fresh --seed`

## Testing the System

1. **Agency Domain**: Visit http://thedarkandbright.com:8000
   - Test contact form submission
   - View portfolio

2. **LPK Domain**: Visit http://lpk.thedarkandbright.com:8000
   - Test contact form submission

3. **Admin Domain**: Visit http://admin.thedarkandbright.com:8000
   - Login with admin credentials
   - View dashboard statistics
   - Manage leads from both domains
   - Manage portfolios
