import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "./contractABI";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [freelancerRating, setFreelancerRating] = useState(null);
  const [jobId, setJobId] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this dApp.");
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
      setContract(contract);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("MetaMask request is already pending. Please approve it.");
    }
  };

  const registerFreelancer = async () => {
    if (!portfolioLink) return alert("Enter IPFS link to your portfolio!");
    try {
      const tx = await contract.registerFreelancer(portfolioLink);
      await tx.wait();
      alert("Freelancer registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  const createJob = async (freelancerAddress, paymentAmount) => {
    try {
      const tx = await contract.createJob(freelancerAddress, {
        value: ethers.parseEther(paymentAmount), // Convert ETH to Wei
      });
      await tx.wait();
      alert("Job created and payment sent!");
    } catch (error) {
      console.error(error);
      alert("Job creation failed.");
    }
  };


  const completeJob = async () => {
    try {
      const tx = await contract.completeJob(jobId, rating, review);
      await tx.wait();
      alert("Job completed successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to complete the job.");
    }
  };
  const [freelancers, setFreelancers] = useState([]);

  const fetchFreelancers = async () => {
    try {
      const count = await contract.freelancerCount();
      let allFreelancers = [];
      for (let i = 0; i < count; i++) {
        let freelancer = await contract.freelancers(i);
        allFreelancers.push({
          address: freelancer.freelancerAddress,
          portfolio: freelancer.portfolio,
          rating: freelancer.rating.toString(),
        });
      }
      setFreelancers(allFreelancers);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch freelancers.");
    }
  };

  useEffect(() => {
    if (contract) fetchFreelancers();
  }, [contract]);

  const fetchFreelancerRating = async (freelancerAddress) => {
    try {
      const rating = await contract.getFreelancerRating(freelancerAddress);
      setFreelancerRating(rating.toString());
    } catch (error) {
      console.error(error);
      alert("Failed to fetch rating.");
    }
  };
  const registerClient = async () => {
    try {
      const tx = await contract.registerClient();
      await tx.wait();
      alert("Client registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };
  const sendMessage = async (receiver, message) => {
    try {
      const tx = await contract.sendMessage(receiver, message);
      await tx.wait();
      alert("Message sent!");
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (!contract) return;

    contract.on("JobCreated", (jobId, freelancer, client, event) => {
      console.log(`New Job Created: ${jobId}`);
      alert(`New job created for freelancer: ${freelancer}`);
    });

    contract.on("JobCompleted", (jobId, rating, review, event) => {
      console.log(`Job Completed: ${jobId}`);
      alert(`Job ${jobId} completed with rating: ${rating}`);
    });

    return () => {
      contract.removeAllListeners();
    };
  }, [contract]);
  // const app = () => {
  //   const [provider, setProvider] = useState(null);
  //   const [contract, setContract] = useState(null);
  //   const [account, setAccount] = useState("");
  //   const [name, setName] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  //   // Connect to wallet
  //   const connectWallet = async () => {
  //     if (window.ethereum) {
  //       const provider = new ethers.BrowserProvider(window.ethereum);
  //       const signer = await provider.getSigner();
  //       const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  
  //       setProvider(provider);
  //       setContract(contract);
  
  //       const accounts = await provider.send("eth_requestAccounts", []);
  //       setAccount(accounts[0]);
  //     } else {
  //       alert("MetaMask not detected!");
  //     }
  //   };
  
  //   // Register User
  //   const registerUser = async () => {
  //     if (!name || !password) return alert("Enter all fields!");
  
  //     const hashedPassword = ethers.keccak256(ethers.toUtf8Bytes(password));
  
  //     try {
  //       const tx = await contract.registerUser(name, hashedPassword);
  //       await tx.wait();
  //       alert("User registered successfully!");
  //     } catch (error) {
  //       console.error("Registration failed:", error);
  //       alert("Error during registration.");
  //     }
  //   };
  
  //   // Login User
  //   const loginUser = async () => {
  //     if (!password) return alert("Enter password!");
  
  //     const hashedPassword = ethers.keccak256(ethers.toUtf8Bytes(password));
  
  //     try {
  //       const result = await contract.loginUser(hashedPassword);
  //       if (result) {
  //         setIsAuthenticated(true);
  //         alert("Login successful!");
  //       } else {
  //         alert("Incorrect password.");
  //       }
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //       alert("Login error.");
  //     }
  //   };

  return (


    <>
      <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
        <button onClick={() => setDarkMode(!darkMode)} className="absolute top-5 right-5 p-2 bg-blue-500 rounded-full">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div><div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Web3 Reputation System</h1>
        <p className="bg-gray-800 px-4 py-2 rounded-lg text-lg">Connected Account: {account}</p>
        <h2 className="text-xl font-semibold text-blue-400">Register as Client</h2>
        <button onClick={registerClient} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-3 rounded">
          Register Client
        </button>

        <div className="w-full max-w-lg bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">Register as Freelancer</h2>
          <input type="text" placeholder="Enter IPFS Portfolio Link" value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <button onClick={registerFreelancer} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-3 rounded">Register</button>
        </div>

        <div className="w-full max-w-lg bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">Create Job</h2>
          <input type="text" placeholder="Freelancer Address" id="freelancerAddress" className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <button onClick={() => createJob(document.getElementById("freelancerAddress").value)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-3 rounded">Create Job</button>
          <input type="text" placeholder="Payment Amount in ETH" id="paymentAmount" className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <button onClick={() => createJob(document.getElementById("freelancerAddress").value, document.getElementById("paymentAmount").value)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-3 rounded">
            Create Job with Payment
          </button>

        </div>

        <div className="w-full max-w-lg bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">Complete Job & Rate Freelancer</h2>
          <input type="text" placeholder="Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)} className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <input type="text" placeholder="Write a review" value={review} onChange={(e) => setReview(e.target.value)} className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <button onClick={completeJob} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-3 rounded">Complete Job</button>
          <input type="text" placeholder="Receiver Address" id="receiverAddress" className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <input type="text" placeholder="Message" id="messageContent" className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <button onClick={() => sendMessage(document.getElementById("receiverAddress").value, document.getElementById("messageContent").value)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-3 rounded">
            Send Message
          </button>

        </div>

        <div className="w-full max-w-lg bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">Check Freelancer Rating</h2>
          <input type="text" placeholder="Freelancer Address" id="ratingFreelancerAddress" className="w-full p-2 mt-2 rounded bg-gray-700 text-white" />
          <button onClick={() => fetchFreelancerRating(document.getElementById("ratingFreelancerAddress").value)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-3 rounded">Get Rating</button>
          {freelancerRating && <p className="text-lg text-yellow-400 mt-3">Freelancer Rating: {freelancerRating}</p>}
        </div>
      </div><h2 className="text-xl font-semibold text-blue-400">Registered Freelancers</h2><ul className="w-full max-w-lg bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
        {freelancers.map((freelancer, index) => (
          <li key={index} className="border-b p-4">
            <p><strong>Address:</strong> {freelancer.address}</p>
            <p><strong>Portfolio:</strong> <a href={freelancer.portfolio} target="_blank" className="text-blue-400">View</a></p>
            <p><strong>Rating:</strong> {freelancer.rating} ⭐</p>
          </li>
        ))}
      </ul></>
  );
  }

export default App;
