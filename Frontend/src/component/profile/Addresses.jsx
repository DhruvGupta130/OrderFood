import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from '../Cart/AddressCard';
import { Button, Card, Modal } from '@mui/material';
import { AddLocationAlt } from '@mui/icons-material';
import AddressForm from '../AddressForm/AddressForm';
import { getUser } from '../State/Authentication/Action';

const Addresses = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setCurrentAddress(null);
  };

  const handleOpenAddressModal = (address = null) => {
    setCurrentAddress(address);
    setOpen(true);
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUser(token));
    }
  }, [dispatch, token, user]);

  return (
      <div>
        <section className='lg:w-[100%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>
              My Addresses
            </h1>
            {user?.addresses.length === 0 && (
                <p className='text-center text-gray-500'>You haven't added any addresses yet.</p>
            )}
            <div className="flex gap-5 flex-wrap justify-center">
              {user?.addresses.map((item) => (
                  <AddressCard
                      key={item.id}
                      handleSelectAddress={() => {}}
                      item={item}
                      showButton={false}
                      handleEditAddress={() => handleOpenAddressModal(item)}
                  />
              ))}
              <Card className='flex gap-5 w-64 p-5'>
                <AddLocationAlt />
                <div className="space-y-3 text-gray-500">
                  <h1 className='font-semibold text-lg'>Add New Address</h1>
                  <Button variant='outlined' fullWidth onClick={() => handleOpenAddressModal()}>
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <AddressForm currentAddress={currentAddress} handleClose={handleClose} />
        </Modal>
      </div>
  );
}

export default Addresses;
