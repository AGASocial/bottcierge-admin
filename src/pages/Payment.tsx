import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'cash' | 'credit_card' | 'debit_card' | 'mobile_payment';
  timestamp: string;
  customerName?: string;
  transactionId?: string;
  refundReason?: string;
}

const Payment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Payment['status'] | ''>('');
  const [methodFilter, setMethodFilter] = useState<Payment['method'] | ''>('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  // Mock data - replace with Redux state
  const [payments] = useState<Payment[]>([
    {
      id: 'pay1',
      orderId: 'order123',
      amount: 156.50,
      status: 'completed',
      method: 'credit_card',
      timestamp: '2025-01-10T10:30:00Z',
      customerName: 'John Doe',
      transactionId: 'tx_123456'
    },
    {
      id: 'pay2',
      orderId: 'order124',
      amount: 89.99,
      status: 'pending',
      method: 'mobile_payment',
      timestamp: '2025-01-10T11:15:00Z',
      customerName: 'Jane Smith'
    }
  ] as Payment[]);

  const getStatusColor = (status: Payment['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      case 'refunded':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMethodIcon = (method: Payment['method']): string => {
    switch (method) {
      case 'cash':
        return '💵';
      case 'credit_card':
        return '💳';
      case 'debit_card':
        return '🏧';
      case 'mobile_payment':
        return '📱';
      default:
        return '💰';
    }
  };

  const handleRefund = (paymentId: string) => {
    // TODO: Implement refund logic
    console.log('Refunding payment:', paymentId);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      !searchTerm || 
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || payment.status === statusFilter;
    const matchesMethod = !methodFilter || payment.method === methodFilter;
    
    const paymentDate = new Date(payment.timestamp);
    const matchesDateRange = (
      (!dateRange.start || paymentDate >= new Date(dateRange.start)) &&
      (!dateRange.end || paymentDate <= new Date(dateRange.end))
    );

    return matchesSearch && matchesStatus && matchesMethod && matchesDateRange;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment Management</h1>

      {/* Filters */}
      <div className="glass-card p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by order ID, customer, or transaction..."
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="input-field"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Payment['status'] | '')}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            className="input-field"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value as Payment['method'] | '')}
          >
            <option value="">All Methods</option>
            <option value="cash">Cash</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="mobile_payment">Mobile Payment</option>
          </select>

          <div className="flex space-x-2">
            <input
              type="date"
              className="input-field flex-1"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
            <input
              type="date"
              className="input-field flex-1"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {payment.orderId}
                      {payment.transactionId && (
                        <div className="text-xs text-gray-400">
                          TX: {payment.transactionId}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{payment.customerName || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">${payment.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm flex items-center">
                      <span className="mr-2">{getMethodIcon(payment.method)}</span>
                      {payment.method.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {new Date(payment.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        className="btn-primary text-xs"
                        onClick={() => window.open(`/payments/${payment.id}`, '_blank')}
                      >
                        View Details
                      </button>
                      {payment.status === 'completed' && (
                        <button
                          className="btn-secondary text-xs"
                          onClick={() => handleRefund(payment.id)}
                        >
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold">
            ${payments
              .filter(p => p.status === 'completed')
              .reduce((sum, p) => sum + p.amount, 0)
              .toFixed(2)}
          </p>
        </div>
        
        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold mb-2">Pending Payments</h3>
          <p className="text-2xl font-bold">
            {payments.filter(p => p.status === 'pending').length}
          </p>
        </div>
        
        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold mb-2">Failed Payments</h3>
          <p className="text-2xl font-bold">
            {payments.filter(p => p.status === 'failed').length}
          </p>
        </div>
        
        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold mb-2">Total Refunds</h3>
          <p className="text-2xl font-bold">
            ${payments
              .filter(p => p.status === 'refunded')
              .reduce((sum, p) => sum + p.amount, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
