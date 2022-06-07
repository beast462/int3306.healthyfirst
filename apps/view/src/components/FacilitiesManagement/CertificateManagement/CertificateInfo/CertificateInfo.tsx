import { CertificateEntity } from '@/common/entities';
import Flexbox from '@/view/common/components/Flexbox';
import { Facility } from '@/view/common/types/Facility';
import { NotificationSeverity } from '@/view/common/types/Notification';
import { useUser } from '@/view/hooks/useUser';
import { ApplicationState } from '@/view/store';
import { notify } from '@/view/store/actions/app/notify';
import styled from '@emotion/styled';
import {
  CheckCircleOutlineRounded,
  NewReleases,
  Info,
  PriorityHigh,
} from '@mui/icons-material';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HttpStatus } from '@nestjs/common/enums';
import { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
`;

const useStyles = makeStyles(() => ({
  btnGroup: {
    flexDirection: 'row-reverse',
    '& button': {
      borderRadius: '8px',
    },
  },

  nodisplay: {
    display: 'none',
  },

  form: {
    display: 'block',
    textAlign: 'center',
    margin: '1rem 0 1rem 0',
  },
}));

const connector = connect(
  (state: ApplicationState) => ({
    facilityId: state.facilityDetail.facility.id,
  }),
  { notify },
);

function CertificateInfo({
  facilityId,
  notify,
}: ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();
  const { user } = useUser() ?? {};
  const [facilityInfo, setFacilityInfo] = useState<Facility>(null);
  const [certificateInfo, setCertificateInfo] =
    useState<Omit<CertificateEntity, 'facility'>>(null);

  const [editMode, setEditMode] = useState(false);

  let order = 0;
  let text = 'Chưa cấp';

  if (
    certificateInfo?.expiredDate === null &&
    certificateInfo?.revoked === null
  ) {
    text = 'Chưa cấp';
    order = 1;
  } else if (certificateInfo?.revoked === 1) {
    text = 'Đã thu hồi, chưa cấp mới';
    order = 2;
  } else if (certificateInfo?.expiredDate) {
    if (new Date(certificateInfo?.expiredDate) < new Date()) {
      text = 'Hết hạn, chưa thu hồi';
      order = 3;
    } else {
      text = 'Còn hiệu lực';
      order = 4;
    }
  }

  const startDateString = new Date(
    certificateInfo?.issuedDate,
  ).toLocaleDateString();
  const endDateString = new Date(
    certificateInfo?.expiredDate,
  ).toLocaleDateString();

  useEffect(() => {
    if (facilityId === 0) return;

    fetch(`/api/facilities/id/${facilityId}`)
      .then((res) => res.json())
      .then((data) => {
        const { statusCode, message, body } = data;

        if (statusCode === HttpStatus.OK) {
          setFacilityInfo(body);
        } else {
          notify(
            'Lấy thông tin cơ sở không thành công',
            NotificationSeverity.ERROR,
            message,
          );
        }
      })
      .catch((err) => {
        notify(
          'Lỗi khi lấy thông tin về cơ sở',
          NotificationSeverity.ERROR,
          err,
        );
      });

    fetch(`/api/certificate/facilityid/${facilityId}`)
      .then((res) => res.json())
      .then((data) => {
        const { statusCode, message, body } = data;

        if (
          statusCode === HttpStatus.OK ||
          statusCode === HttpStatus.NOT_FOUND
        ) {
          setCertificateInfo(body);
        } else {
          setCertificateInfo(body);
          notify(
            'Lấy thông tin giấy chứng nhận không thành công',
            NotificationSeverity.ERROR,
            message,
          );
        }
      })
      .catch((err) => {
        notify(
          'Lỗi khi lấy thông tin về giấy chứng nhận',
          NotificationSeverity.ERROR,
          err,
        );
      });
  }, [facilityId]);

  const handleRevokeClick = () => {
    fetch(`/api/certificate/id/${certificateInfo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...certificateInfo, revoked: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { statusCode, message, body } = data;

        if (statusCode === HttpStatus.OK) {
          notify(
            'Thu hồi giấy chứng nhận thành công',
            NotificationSeverity.SUCCESS,
          );
          setCertificateInfo(body);
        } else {
          notify(
            'Thu hồi giấy chứng nhận không thành công',
            NotificationSeverity.ERROR,
            message,
          );
        }
      })
      .catch((err) => {
        notify(
          'Lỗi khi thu hồi giấy chứng nhận',
          NotificationSeverity.ERROR,
          err,
        );
      });
  };

  const handleCheck = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    if (
      target.issueId.value === '' ||
      isNaN(+target.issueId.value) ||
      +target.issueId.value <= 0 ||
      +target.issueId.value <= certificateInfo?.issueId
    ) {
      notify('Số cấp mới không hợp lệ', NotificationSeverity.ERROR);
      return;
    }

    let newCertificateInfo = {};
    let method = 'PUT';
    let url = '/api/certificate';

    if (certificateInfo === undefined) {
      newCertificateInfo = {
        facilityId: facilityId,
        revoked: 0,
        issueId: +target.issueId.value,
        issuedDate: new Date().toISOString().slice(0, 10),
        expiredDate: new Date(Date.now() + 31536000000)
          .toISOString()
          .slice(0, 10),
        issuedBy: user.displayName,
      };
      method = 'POST';
    } else {
      newCertificateInfo = {
        ...certificateInfo,
        revoked: 0,
        issueId: +target.issueId.value,
        issuedDate: new Date().toISOString().slice(0, 10),
        expiredDate: new Date(Date.now() + 31536000000)
          .toISOString()
          .slice(0, 10),
        issuedBy: user.displayName,
      };

      url = `/api/certificate/id/${certificateInfo?.id}`;
    }

    const { statusCode, message, body } = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newCertificateInfo),
    }).then((res) => res.json());

    if (statusCode === HttpStatus.OK) {
      notify(
        'Cấp giấy chứng nhận mới thành công',
        NotificationSeverity.SUCCESS,
      );
      setCertificateInfo(body);
      console.log(body);
      setEditMode(false);
    } else {
      notify('Số cấp này đã được dùng', NotificationSeverity.ERROR, message);
    }
  };

  return (
    <Root>
      <Typography variant="h5" textAlign="center">
        Thông tin về giấy chứng nhận vệ sinh an toàn thực phẩm
      </Typography>
      <Grid container spacing={2} my="1rem" maxWidth="600px" mx="auto">
        <Grid item xs={4}>
          <Typography>Cơ sở: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{facilityInfo?.name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Chủ cơ sở: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{facilityInfo?.ownerName}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Số cấp: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{certificateInfo?.issueId}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Cấp bởi: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{certificateInfo?.issuedBy}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Thời gian hiệu lực:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            {startDateString !== 'Invalid Date' &&
              `Từ ngày ${startDateString} đến ngày ${endDateString}`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Trạng thái: </Typography>
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex' }}>
          <Grid item xs={1}>
            {order === 4 ? (
              <CheckCircleOutlineRounded color="success" />
            ) : order === 3 ? (
              <NewReleases color="error" />
            ) : order === 2 ? (
              <Info color="info" />
            ) : (
              <PriorityHigh color="warning" />
            )}
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body1" fontWeight="bold" mt="0rem" noWrap>
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <form
        onSubmit={handleCheck}
        className={editMode ? styles.form : styles.nodisplay}
      >
        <TextField
          label="Nhập số cấp mới"
          name="issueId"
          size="medium"
          variant="outlined"
        />
        <Button
          variant="contained"
          sx={{
            height: '56px',
            marginLeft: '1rem',
            display: 'inline-block',
          }}
          type="submit"
        >
          Kiểm tra
        </Button>
      </form>

      <Flexbox className={styles.btnGroup}>
        <Button
          variant="outlined"
          sx={{ margin: '1rem 0rem 1rem 0', height: '40px' }}
          disabled={order > 2 || (order <= 2 && editMode)}
          onClick={() => setEditMode(true)}
        >
          Cấp mới
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ margin: '1rem 1rem 1rem 0', height: '40px' }}
          disabled={order <= 2}
          onClick={handleRevokeClick}
        >
          Thu hồi
        </Button>
      </Flexbox>
    </Root>
  );
}

export default connector(CertificateInfo);
