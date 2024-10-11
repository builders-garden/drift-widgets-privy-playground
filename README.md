# Drift Widget Playground

This project is a Next.js application that demonstrates the integration of Drift Widgets, specifically the Drift Offramp widget, along with Privy for wallet connection and authentication.

## Features

- Drift Offramp widget integration
- Privy authentication and wallet connection
- Responsive design with Tailwind CSS and NextUI
- Support for Base and Base Sepolia networks

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Set up your environment variables:

Create a `.env.local` file in the root directory and add the following:

```
NEXT_PUBLIC_DRIFT_APP_ID=your_drift_app_id_here
NEXT_PUBLIC_DRIFT_APP_SECRET=your_drift_app_secret_here
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

4. Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application pages and layout
- `components/`: Reusable React components
- `lib/`: Utility functions and constants
- `public/`: Static assets

## Dependencies

Key dependencies include:

- Next.js
- React
- @buildersgarden/drift
- @privy-io/react-auth
- @privy-io/wagmi
- wagmi
- viem
- @nextui-org/react
- Tailwind CSS

For a full list of dependencies, refer to the `package.json` file.

## Usage

The main page (`app/page.tsx`) demonstrates how to use the Drift Offramp widget:

1. Login using Privy authentication.
2. Once authenticated, the Drift Offramp widget will be displayed.
3. You can also open the Offramp Modal version.

## Customization

You can customize the appearance of the application by modifying the Tailwind CSS configuration in `tailwind.config.ts` and the global styles in `app/globals.css`.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Privy Documentation](https://docs.privy.io/)
- [Wagmi Documentation](https://wagmi.sh/)
- [NextUI Documentation](https://nextui.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
